import { useRef } from "react";
import Button from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const userValue = useRef<HTMLInputElement>();
  const userPassword = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function signup() {
    const username = userValue.current?.value;
    const password = userPassword.current?.value;

    try {
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });

      navigate("/dashboard")
    } catch (error) {
      console.log("error in signup frontend", error);
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-xl border min-w-56 p-8">
        <div className="text-2xl flex items-center justify-center pb-2">
          SignUp Page
        </div>
        <div className="py-5">
        <Input reff={userValue} placeholder="Username" />
        </div>
        <Input reff={userPassword} placeholder="Password" />
        <div className="flex justify-center items-center pt-5 pr-5">
          <Button
            onclose={signup}
            loading={false}
            sizeStyles="md"
            varient="primary"
            text="Sign Up"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
