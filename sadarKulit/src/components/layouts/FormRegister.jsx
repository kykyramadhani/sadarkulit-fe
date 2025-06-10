import { useState } from "react";
import InputForm from "../../components/elements/Input";
import Button from "../elements/Button";
import Swal from "sweetalert2";

export default function FormRegister() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Semua field wajib diisi!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Tidak Cocok",
        text: "Password dan konfirmasi password harus sama!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    Swal.fire({
      title: "Mendaftarkan...",
      text: "Harap tunggu saat kami memproses pendaftaran Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://sadarkulit-be.vercel.app/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Akun Anda telah dibuat. Anda akan diarahkan ke halaman login.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.message || "Terjadi kesalahan saat registrasi",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
        <InputForm
          name="Username"
          inputFor="name"
          type="text"
          placeholder="Enter Your Name"
          className="w-full"
        />
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
        <InputForm
          name="Confirm Password"
          inputFor="confirm-password"
          type="password"
          placeholder="Confirm Password"
          className="w-full"
        />
        <Button
          classname="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </Button>
      </form>
    </div>
  );
}