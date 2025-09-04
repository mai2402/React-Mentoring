import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type MutationKey,
  type QueryKey,
} from "@tanstack/react-query";


/**
 * Generic optimistic-mutation helper.
 * - Cancels in-flight query for the target cache entry
 * - Snapshots prev for rollback
 * - Applies optimistic patch (shallow merge by default)
 * - Invalidates on settle
 */
export function useOptimisticMutation<TData, TError, TVars, TCache>(
    params: {
        
    mutationKey: MutationKey;
    mutationFn: (vars: TVars) => Promise<TData>;
    // compute the queryKey to patch (usually depends on vars)
    queryKeyOf: (vars: TVars) => QueryKey;
    // build Partial<TCache> patch from vars (+ optionally prev)
    makePatch: (vars: TVars, prev: TCache | undefined) => Partial<TCache> | undefined;
  },
  options?: Omit<UseMutationOptions<TData, TError, TVars, { prev?: TCache }>,
                 "mutationFn" | "mutationKey" | "onMutate">
    
){

    const queryClient = useQueryClient();

    return useMutation<TData,TError,TVars,{ prev?: TCache }>({
          mutationKey: params.mutationKey,
          mutationFn: params.mutationFn,

          // Optimistic Update 
          onMutate: async (vars)=>{
            // 1) Figure out which cache entry we’re about to touch
               const qk = params.queryKeyOf(vars);

            // 2) Stop any in-flight refetch for that key to avoid a late response
               queryClient.cancelQueries({queryKey: qk});

            // 3) Snapshot current cached value — we’ll use it to rollback if the server call fails.
              const prev = queryClient.getQueryData<TCache>(qk);

            // 4) Build the *minimal* change we want to show instantly.
              const patch = params.makePatch(vars,prev);

            // 5) If we have something cached and a patch, apply it now.  
               if (patch){
                // Shallow merge = only the fields in `patch` change.
                 queryClient.setQueryData<TCache>(qk, {...(prev as object ?? {}), ...patch} as TCache);
               }

            // 6) Give `prev` to onError so we can rollback if needed.
              return { prev };  
          },

        onError: (err, vars, ctx) => {
            // If the server call failed, put the cache back exactly as it was
            // before onMutate changed it.
            if (ctx?.prev) {
                queryClient.setQueryData<TCache>(params.queryKeyOf(vars), ctx.prev);
            }
            // Also run any user-provided error handler (toast, form errors, logging…)
            options?.onError?.(err, vars, ctx);
        },

        onSettled: (data, err, vars, ctx) => {
            // Runs on BOTH success and error.
            // Ask React Query to refetch the canonical data for that key so the cache
            // matches the server 100% after the mutation finishes.
            queryClient.invalidateQueries({ queryKey: params.queryKeyOf(vars) });

            // Then call any user-provided onSettled callback.
            options?.onSettled?.(data, err, vars, ctx);
        },

     ...options,

    })

}