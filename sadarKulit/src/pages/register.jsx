import FormRegister from "../components/layouts/FormRegister";
import AuthorLayout from "../components/layouts/AuthorLayout";

export default function Register () {
    return (
       <AuthorLayout tittle="Daftar" type="register">
            <FormRegister />
        </AuthorLayout>
    );
}