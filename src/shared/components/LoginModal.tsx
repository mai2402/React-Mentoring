import { loginSchema } from "../../modules/sessions/validation/session";
import Form from "../ui/Form";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LoginModalProps } from "../interface/modal";
import { useHandleLogin } from "../hooks/useHandleLogin";
import { AppRoute } from "../../app/enums/routes";
import { ButtonVariations } from "../enums/buttons";

export function LoginModal({ onClose, isOpen, sessionId }: LoginModalProps) {
  const handleLogin = useHandleLogin(sessionId);
  const defaultValues = { email: "", password: "" };

  return (
    <Modal title="Log in to continue" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleLogin} schema={loginSchema} defaultValues={defaultValues}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Your Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Your Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <p className="signup-prompt">
              Don’t have an account?{" "}
              <Button ui={{ variation: ButtonVariations.Link }} to={AppRoute.SignUp} className="signup-link">
                Create one
              </Button>
            </p>

            <div className="modal-actions">
              {/* submit the form */}
              <Button ui={{ variation: ButtonVariations.Primary }} htmlType="submit" >
                Log in
              </Button>

              {/* close modal */}
              <Button ui={{ variation: ButtonVariations.Link }} onClick={() => onClose?.()}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
}
