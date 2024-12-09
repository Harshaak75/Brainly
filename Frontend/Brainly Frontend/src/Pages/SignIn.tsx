import { useRef } from "react";
import Button from "../Components/Button";
import { Input } from "../Components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const userValue = useRef<HTMLInputElement>();
  const userPassword = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function signin() {
    const username = userValue.current?.value;
    const password = userPassword.current?.value;

    try {
      const response =  await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });
      const jwt_token = response.data.token;
      localStorage.setItem("jwt_token", jwt_token);
      
      navigate("/dashboard");

    } catch (error) {
      console.log("error in signin frontend", error);
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-xl border min-w-56 p-8">
        <div className="text-2xl flex items-center justify-center pb-2">
          SignIn Page
        </div>
        <div className="py-5">
        <Input reff={userValue} placeholder="Username" />
        </div>
        <Input reff={userPassword} placeholder="Password" />
        <div className="flex justify-center items-center pt-5 pr-5">
          <Button
            loading={false}
            sizeStyles="md"
            varient="primary"
            text="Sign Up"
            fullWidth={true}
            onclose={signin}
          />
        </div>
      </div>
    </div>
  );
}
