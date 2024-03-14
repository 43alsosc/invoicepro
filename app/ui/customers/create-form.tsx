"use client";
import Link from "next/link";
import {
  InformationCircleIcon,
  EnvelopeIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function Form() {
  // Use the router to redirect the user to the newly created invoice
  const router = useRouter();

  // State variables for data fields from forms
  const [customerName, setCustomerName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [email, setEmail] = useState("");

  // State variables for error messages
  const [customerNameError, setCustomerNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleCustomerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerName(event.target.value);
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous error messages
    setCustomerNameError("");
    setImageUrlError("");
    setEmailError("");

    // Validation checks
    if (!customerName) {
      setCustomerNameError("Customer Name is required.");
    }
    if (!image_url) {
      setImageUrlError("Image Url is required.");
    }
    if (!email) {
      setEmailError("Email is required.");
    }

    if (customerNameError || imageUrlError || emailError) {
      return;
    }

    // Insert the invoice into the database
    if (customerName && image_url && email) {
      const { error } = await supabase.from("customers").insert([
        {
          customerName,
          image_url,
          email,
        },
      ]);
      // Log any errors

      if (error) {
        console.error("Error creating invoice:", error);
      } else {
        // Clear the form fields
        setCustomerName("");
        setImageUrl("");
        setEmail("");
      }

      // Redirect the user to the newly created invoice
      router.push("/dashboard/customers");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Set the Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="text"
                placeholder="ExampleFirstName ExampleLastName"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleCustomerNameChange}
              />
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
              {customerNameError && (
                <div style={{ color: "red" }}>{customerNameError}</div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set the Profile Picture Url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image_url"
                type="text"
                placeholder="https://example.com/image.jpg"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleImageUrlChange}
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
              {imageUrlError && (
                <div style={{ color: "red" }}>{imageUrlError}</div>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set the Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="example.user@email.com"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleEmailChange}
              />
              <InboxArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div>
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-blue-500 text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  );
}
