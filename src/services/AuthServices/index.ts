"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types";
export const registerUser = async (userData: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  const result = await res.json();
  if (result.success) {
    (await cookies()).set("accessToken", result.data.accessToken);
  }

  return result;
};

export const loginUser = async (userData: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const result = await res.json();
  if (result.success) {
    (await cookies()).set("accessToken", result.data.accessToken);
  }

  return result;
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodeData = null;
  if (accessToken) {
    decodeData = jwtDecode(accessToken) as IUser;
    console.log(decodeData);
    return decodeData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
