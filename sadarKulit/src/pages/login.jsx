import FormLogin from "../components/layouts/FormLogin";
import AuthorLayout from "../components/layouts/AuthorLayout";
import Navbar from "../components/Navbar";

export default function Login () {
    return (
        
        <AuthorLayout title="Masuk" type="login">
            <FormLogin />
        </AuthorLayout>
    );
}