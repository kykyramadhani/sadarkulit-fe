import FormLogin from "../components/layouts/FormLogin";
import AuthorLayout from "../components/layouts/AuthorLayout";
import Navbar from "../components/Navbar";

export default function Login () {
    return (
        
        <AuthorLayout tittle="Login" type="login">
            <FormLogin />
        </AuthorLayout>
    );
}