import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { publishWithUsSchema, PublishWithUsFormData } from "@modules/schema/schema";
import InputField from "@modules/common/components/inputfeild";
import { Select } from "@medusajs/ui";

export default function PublishWithUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PublishWithUsFormData>({
    resolver: zodResolver(publishWithUsSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl mx-4 sm:mx-0 mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField name="authorName" label="Author Name" register={register} errors={errors} />
        <InputField name="instituteName" label="Institute Name" register={register} errors={errors} />
        <InputField name="authorAffiliation" label="Author Affiliation" register={register} errors={errors} />
        <InputField name="email" label="Email Address" type="email" register={register} errors={errors} />
        <InputField name="address" label="Address" register={register} errors={errors} />
        <InputField name="city" label="City" register={register} errors={errors} />
        <InputField name="state" label="State" register={register} errors={errors} />
        <InputField name="country" label="Country" register={register} errors={errors} />
        <InputField name="pinZip" label="Pin/Zip Code" register={register} errors={errors} />
        <InputField name="contactNumber" label="Contact Number" register={register} errors={errors} />
        <InputField name="bookTitle" label="Title of the Book" register={register} errors={errors} />
        
        {/* Discipline Select */}
        <div>
          {/* <label className="text-gray-700 text-sm font-medium">Discipline</label> */}
          <Select {...register("discipline")}>
            <Select.Trigger>
              <Select.Value placeholder="Select Discipline" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Science">Science</Select.Item>
              <Select.Item value="Arts">Arts</Select.Item>
              <Select.Item value="Commerce">Commerce</Select.Item>
            </Select.Content>
          </Select>
          {errors.discipline && <p className="text-red-500 text-xs mt-1">{errors.discipline.message}</p>}
        </div>
        
        {/* Subject Input */}
        <InputField name="subject" label="Subject" register={register} errors={errors} />
        
        {/* Book Status Select */}
        <div>
          {/* <label className="text-gray-700 text-sm font-medium">Status of the Book</label> */}
          <Select {...register("statusOfBook")}>
            <Select.Trigger>
              <Select.Value placeholder="Select Book Status" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Completed">Completed</Select.Item>
              <Select.Item value="In Progress">In Progress</Select.Item>
              <Select.Item value="Draft">Draft</Select.Item>
            </Select.Content>
          </Select>
          {errors.statusOfBook && <p className="text-red-500 text-xs mt-1">{errors.statusOfBook.message}</p>}
        </div>
        
        {/* Synopsis Textarea */}
        <div className="md:col-span-2">
          <textarea
            {...register("synopsis")}
            rows={5}
            placeholder="Enter book synopsis"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EA5900] focus:border-[#EA5900]"
          ></textarea>
          {errors.synopsis && <p className="text-red-500">{errors.synopsis.message}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full max-w-[200px] py-3 bg-[#EA5900] text-white font-semibold rounded-lg shadow-md hover:bg-[#EA5900] focus:outline-none focus:ring-2 focus:ring-[#EA5900]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
