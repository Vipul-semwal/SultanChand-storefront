"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select } from "@medusajs/ui";
import { specimenRequestSchema, specimenFormData } from "../../schema/schema";
import { useCities } from "../../../lib/hooks/useCities";
import { stateCityData } from "@lib/data/stateCityData";

export default function SpecimenRequestForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<specimenFormData>({
    resolver: zodResolver(specimenRequestSchema),
  });

  const selectedState = watch("state");
  
  const test = watch("schoolName");
  const cities = useCities(selectedState);
  console.log('ciotesss:',selectedState)

  const onSubmit = (data: specimenFormData) => {
    console.log("Form Submitted:", test);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Specimen Request Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Category Name</label>
          <Select {...register("categoryName")}>
            <Select.Trigger>
              <Select.Value placeholder="Select Category" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Teacher">Teacher</Select.Item>
              <Select.Item value="Student">Student</Select.Item>
            </Select.Content>
          </Select>
          {errors.categoryName && <p className="text-red-500 text-xs mt-1">{errors.categoryName.message}</p>}
        </div>

        {/* School Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">School/College/Coaching Name</label>
          <Input {...register("schoolName")} className="mt-1 w-full" />
          {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>}
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

        {/* Residence Address */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Residence Address</label>
          <Input {...register("residenceAddress")} className="mt-1 w-full" />
          {errors.residenceAddress && <p className="text-red-500 text-xs mt-1">{errors.residenceAddress.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Phone Number</label>
          <Input {...register("phoneNumber")} className="mt-1 w-full" />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Email</label>
          <Input type="email" {...register("email")} className="mt-1 w-full" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Title Name */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Title Name</label>
          <Input {...register("titleName")} className="mt-1 w-full" />
          {errors.titleName && <p className="text-red-500 text-xs mt-1">{errors.titleName.message}</p>}
        </div>

        {/* Strength */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Strength</label>
          <Select {...register("strength")}>
            <Select.Trigger>
              <Select.Value placeholder="Select Strength" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="10">10 Students</Select.Item>
              <Select.Item value="20">20 Students</Select.Item>
            </Select.Content>
          </Select>
          {errors.strength && <p className="text-red-500 text-xs mt-1">{errors.strength.message}</p>}
        </div>

        {/* School Address */}
        <div>
          <label className="text-gray-700 text-sm font-medium">School/College Address</label>
          <Input {...register("schoolAddress")} className="mt-1 w-full" />
          {errors.schoolAddress && <p className="text-red-500 text-xs mt-1">{errors.schoolAddress.message}</p>}
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

        {/* Pin Code */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Pin Code</label>
          <Input {...register("pinCode")} className="mt-1 w-full" />
          {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Mobile Number</label>
          <Input {...register("mobileNumber")} className="mt-1 w-full" />
          {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
        </div>

        {/* Title Category */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Title Category</label>
          <Input {...register("titleCategory")} className="mt-1 w-full" />
          {errors.titleCategory && <p className="text-red-500 text-xs mt-1">{errors.titleCategory.message}</p>}
        </div>

        {/* File Uploads */}
        <div>
          <label className="text-gray-700 text-sm font-medium">Attach Letter Head</label>
          <Input type="file" {...register("letterHead")} className="mt-1 w-full" />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">Attach Photo ID</label>
          <Input type="file" {...register("photoID")} className="mt-1 w-full" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-lg">
          Submit
        </Button>
      </div>
    </form>
  );
}
