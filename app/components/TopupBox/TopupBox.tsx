"use client";

import { Button } from "@/components/ui/button";
import { permanentRedirect } from "next/navigation";
import { useCallback } from "react";

const mockTopupValue = {
  amount: 10000,
  bankCode: "ncb",
};

const TopupBox = () => {
  const handleTopupVnpay = useCallback(async () => {
    const mockTopupValue = {
      amount: 10000, // number
      bankCode: "ncb", // string
    };

    // Convert all values to strings
    const params = new URLSearchParams(
      Object.entries(mockTopupValue).reduce((acc, [key, value]) => {
        acc[key] = String(value); // Ensure all values are strings
        return acc;
      }, {} as Record<string, string>)
    );

    const response = await fetch("/api/payment/vnpay/create", {
      method: "POST", // Ensure the HTTP method is specified
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Correctly define the headers
      },
      body: new URLSearchParams(params).toString(), // Convert the object to URL-encoded string
    });

    const {statusCode, data} = await response.json();

    statusCode === 200 && permanentRedirect(data);
  }, []);

  return (
    <div className="mt-5 border-2 rounded border-red-more-dark max-w-lg w-full p-2">
      This is Topup Box
      <Button onClick={() => handleTopupVnpay()}>Vnpay</Button>
    </div>
  );
};

export default TopupBox;
