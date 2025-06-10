import InputForm from "../../components/elements/Input";
import Button from "../elements/Button";
import Swal from "sweetalert2";

export default function FormLogin() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    Swal.fire({
      title: "Memproses...",
      text: "Harap tunggu saat kami memverifikasi login Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://sadarkulit-be.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "Email atau password salah",
          confirmButtonColor: "#d33",
        });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda akan diarahkan ke halaman utama",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Terjadi kesalahan saat masuk. Silakan coba lagi.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 items-center">
        <InputForm
          name="Email"
          inputFor="email"
          type="email"
          placeholder="Email"
          className="w-full"
        />
        <InputForm
          name="Password"
          inputFor="password"
          type="password"
          placeholder="Password"
          className="w-full"
        />
        <Button
          classname="w-full mt-5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full py-2"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}