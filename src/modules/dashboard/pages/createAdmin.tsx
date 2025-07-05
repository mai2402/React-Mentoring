import CreateAdminForm from "../components/admin/createAdminForm";



export default function CreateAdminPage (){
   
  return (
    <section className="create-admin-page">
      <h1>Create New Admin</h1>
      <p>Fill in the details of the user you want to promote to admin.</p>
      <CreateAdminForm />
    </section>
  );
}

