import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome Back 👋
          </h1>

          <p className="text-gray-700 mt-2">
            Login to continue chatting 💬
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full h-12 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full h-12 rounded-xl"
          />

          <button className="btn btn-primary w-full h-12 rounded-xl text-base hover:scale-105 hover:bg-purple-900 transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;