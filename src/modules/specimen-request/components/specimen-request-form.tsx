"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select } from "@medusajs/ui";
import { specimenRequestSchema, specimenFormData } from "../../schema/schema";
import { useCities } from "../../../lib/hooks/useCities";
import { stateCityData } from "@lib/data/stateCityData";
import { useMutationData } from "@lib/hooks/useMutationData";
import { sdk } from "@lib/config";
import { toast } from "@medusajs/ui";
import uploadFileWithSdk from "@lib/data/uploadfile";

export default function SpecimenRequestForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<specimenFormData>({
    resolver: zodResolver(specimenRequestSchema),
  });

  const selectedState = watch("state");

  const cities = useCities(selectedState);

  const { mutate, isPending } = useMutationData(
    ["specimenrequest"],
    async (data) => {
      const res = await sdk.client.fetch<{
        sucsess: boolean,
        message: string
      }>("/store/specimen", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('ressssonhshdeiur', res)
      if (!res.sucsess) {
        throw new Error("something went wrong");
      }

      return res
    },
    ["specimenrequest"],
    () => {
      toast.success("Info", {
        description: "Request submmited successfully",
      })
      reset()
    }
  );

  const onSubmit = async (data: specimenFormData) => {
    try {
      const missingFiles = [];
      if (!data.letter_head?.[0]) missingFiles.push("Letter Head");
      if (!data.photo_id?.[0]) missingFiles.push("Photo ID");

      if (missingFiles.length) {
        toast.error("Missing Files", {
          description: `${missingFiles.join(" and ")} ${missingFiles.length > 1 ? "are" : "is"} required.`,
        });
        return;
      }
      console.log('saryahahai:', data)
      const [letterHeadUrl, photoIDUrl] = await Promise.all([
        data.letter_head?.[0] ? uploadFileWithSdk(data.letter_head[0]) : null,
        data.photo_id?.[0] ? uploadFileWithSdk(data.photo_id[0]) : null,
      ]);

      console.log('filessbaey',letterHeadUrl,photoIDUrl);
      if (!(letterHeadUrl?.success && photoIDUrl?.success)) {
        throw new Error('File upload failed: Ensure both letterHead and photoID are uploaded successfully.');
      }
      console.log('letter head:',letterHeadUrl,photoIDUrl);
      const updatedData = {
        ...data,
        letter_head: letterHeadUrl.url,
        photo_id: photoIDUrl.url,
      };

      mutate(updatedData);
    } catch (error) {
      console.log('erro:', error)
      toast.error("Error", {
        description: "File upload failed. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Specimen <span className="text-orange-500">Request</span> Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Category Name</label>
          <Select {...register("category_name")} onValueChange={(data) => {
            setValue('category_name', data);
          }}>
            <Select.Trigger>
              <Select.Value placeholder="Select Category" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Teacher">Teacher</Select.Item>
              <Select.Item value="Student">Student</Select.Item>
            </Select.Content>
          </Select>
          {errors.category_name && <p className="text-red-500 text-xs mt-1">{errors.category_name.message}</p>}
        </div>

        {/* School Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">School/College/Coaching Name*</label>
          <Input {...register("school_name")} className="mt-1 w-full" />
          {errors.school_name && <p className="text-red-500 text-xs mt-1">{errors.school_name.message}</p>}
        </div>

        {/* name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Name*</label>
          <Input {...register("name")} className="mt-1 w-full" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="text-gray-700 text-sm font-medium">State</label>
          <Select
            {...register("state")}
            onValueChange={(value) => {
              setValue("state", value);
              setValue("city", ""); // Reset city when state changes
            }}
            value={selectedState}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select State" />
            </Select.Trigger>
            <Select.Content>
              {Object.keys(stateCityData).map((state) => (
                <Select.Item key={state} value={state}>
                  {state}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>

        {/* City */}
        <div>
          <label className="text-gray-700 text-sm font-medium">City</label>
          <Select
            {...register("city")}
            onValueChange={(value) => setValue("city", value)}
            value={watch("city")}
            disabled={!selectedState}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select City" />
            </Select.Trigger>
            <Select.Content>
              {cities.map((city) => (
                <Select.Item key={city} value={city}>
                  {city}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>


        {/* Residence Address */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Residence Address*</label>
          <Input {...register("residence_address")} className="mt-1 w-full" />
          {errors.residence_address && <p className="text-red-500 text-xs mt-1">{errors.residence_address.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Phone Number</label>
          <Input {...register("phone_number")} className="mt-1 w-full" type="number" />
          {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
        </div>


        {/* Email */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Email*</label>
          <Input type="email" {...register("email")} className="mt-1 w-full" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Title Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Title Name*</label>
          <Input {...register("title_name")} className="mt-1 w-full" />
          {errors.title_name && <p className="text-red-500 text-xs mt-1">{errors.title_name.message}</p>}
        </div>

        {/* Strength */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Strength</label>
          <Select {...register("strength")} onValueChange={(data) => {
            setValue("strength", data)
          }}>
            <Select.Trigger>
              <Select.Value placeholder="Select Strength" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="10">10 Students</Select.Item>
              <Select.Item value="20">20 Students</Select.Item>
              <Select.Item value="50">50 Students</Select.Item>
              <Select.Item value="80">80 Students</Select.Item>
              <Select.Item value="100">100 Students</Select.Item>
              <Select.Item value="200">200 Students</Select.Item>
            </Select.Content>
          </Select>
          {errors.strength && <p className="text-red-500 text-xs mt-1">{errors.strength.message}</p>}
        </div>


        {/* School Address */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Adress of School/College/Coaching*</label>
          <Input {...register("school_address")} className="mt-1 w-full" />
          {errors.school_address && <p className="text-red-500 text-xs mt-1">{errors.school_address.message}</p>}
        </div>
        {/* Pin Code */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Pin Code*</label>
          <Input {...register("pin_code")} className="mt-1 w-full" />
          {errors.pin_code && <p className="text-red-500 text-xs mt-1">{errors.pin_code.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Mobile Number*</label>
          <Input {...register("mobile_number")} className="mt-1 w-full" type="number" />
          {errors.mobile_number && <p className="text-red-500 text-xs mt-1">{errors.mobile_number.message}</p>}
        </div>


        {/* Title Category */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Title Category*</label>
          <Select {...register("title_category")} onValueChange={(data) => {
            setValue('title_category', data);
          }}>
            <Select.Trigger>
              <Select.Value placeholder="Select Category" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Accountancy">Accountancy</Select.Item>
              <Select.Item value="Commerce & Management">Commerce & Management</Select.Item>
              <Select.Item value="Computer & Information Technology">Computer & Information Technology</Select.Item>
              <Select.Item value="Economics">Economics</Select.Item>
              <Select.Item value="Humanities">Humanities</Select.Item>
              <Select.Item value="Law">Law</Select.Item>
              <Select.Item value="Management">Management</Select.Item>
              <Select.Item value="Mathematical Sciences">Mathematical Sciences</Select.Item>
              <Select.Item value="Philosophy">Philosophy</Select.Item>
              <Select.Item value="Psychology">Psychology</Select.Item>
              <Select.Item value="Science">Science</Select.Item>
              <Select.Item value="Self Development/Improvement">Self Development/Improvement</Select.Item>
            </Select.Content>
          </Select>
          {errors.title_category && <p className="text-red-500 text-xs mt-1">{errors.title_category.message}</p>}
        </div>

        {/* File Uploads */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Attach Letter Head</label>
          <Input type="file" {...register("letter_head")} className="mt-1 w-full" />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Attach Photo ID</label>
          <Input type="file" {...register("photo_id")} className="mt-1 w-full" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
  <Button
    type="submit"
    className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-8 text-sm border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-transparent"
    disabled={isPending}
  >
    {isPending ? "loading..." : "Submit"}
  </Button>
</div>


    </form>
  );
}
