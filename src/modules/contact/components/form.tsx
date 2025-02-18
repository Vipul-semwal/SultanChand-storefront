import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@medusajs/ui";
import { z } from "zod";
import  { contactSchema,ContactFormData } from "../../schema/schema";

// Define Zod schema




export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log("Form data:", data);
    // Add your form submission logic here
  };

  return (
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        We will contact you soon!
      </h2>
      <p className="leading-relaxed mb-5 text-gray-600">
        Post-ironic Portland shabby chic echo park, banjo fashion axe
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <Input
            {...register("name")}
          />
            {errors.message?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <Input
            type="email"
            {...register("email")}
          />
           {errors.message?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="relative mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            className="w-full bg-white rounded border border-gray-300 focus:border-[#EA5900] focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            placeholder="Your message"
          />
          {errors.message?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-[#EA5900] border-0 py-2 px-6 focus:outline-none hover:bg-[#EA5900] rounded text-lg"
        >
          Submit
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Chicharrones blog helvetica normcore Iceland tousled brook viral artisan.
        </p>
      </form>
    </div>
  );
}