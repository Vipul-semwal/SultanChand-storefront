import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { publishWithUsSchema, PublishWithUsFormData } from "@modules/schema/schema";
import InputField from "@modules/common/components/inputfeild";
import { Select } from "@medusajs/ui";
import { useMutationData } from "@lib/hooks/useMutationData";
import { sdk } from "@lib/config";
import { toast } from "@medusajs/ui";

export default function PublishWithUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<PublishWithUsFormData>({
    resolver: zodResolver(publishWithUsSchema),
  });

  const { mutate,isPending } = useMutationData(
      ["publishWithUs"],
      async (data) => {
        const res = await sdk.client.fetch<{
          sucsess:boolean,
          message:string
        }>("/store/publish-with-us", {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        });
          
        console.log('ressssonhshdeiur',res)
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

  const onSubmit = (data:PublishWithUsFormData) => {
    // console.log("Form Data:", data); 
    mutate(data);
  };
  console.log('ye dkehoinko:',errors)

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl mx-4 sm:mx-0 mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField name="author_name" label="Author Name" register={register} errors={errors} />
        <InputField name="institute_name" label="Institute Name" register={register} errors={errors} />
        <InputField name="author_affiliation" label="Author Affiliation" register={register} errors={errors} />
        <InputField name="email" label="Email Address" type="email" register={register} errors={errors} />
        <InputField name="address" label="Address" register={register} errors={errors} />
        <InputField name="city" label="City" register={register} errors={errors} />
        <InputField name="state" label="State" register={register} errors={errors} />
        <InputField name="country" label="Country" register={register} errors={errors} />
        <InputField name="pin_zip" label="Pin/Zip Code" register={register} errors={errors} />
        <InputField name="contact_number" label="Contact Number" type="number" register={register} errors={errors} />
        <InputField name="title_of_book" label="Title of the Book" register={register} errors={errors} />

        {/* Discipline Select */}
        <div>
          <label htmlFor="discipline" className="text-gray-700 text-sm font-medium">Discipline</label>
          <Select {...register("discipline")} onValueChange={(data)=>{
            setValue("discipline",data)
          }}>
            <Select.Trigger id="discipline">
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
          <label htmlFor="statusOfBook" className="text-gray-700 text-sm font-medium">Status of the Book</label>
          <Select {...register("status_of_book")} onValueChange={(data)=>{
            setValue("status_of_book",data)
          }}>
            <Select.Trigger id="statusOfBook">
              <Select.Value placeholder="Select Book Status" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Published">Published</Select.Item>
              <Select.Item value="Under Review">Under Review</Select.Item>
              <Select.Item value="Draft">Draft</Select.Item>
            </Select.Content>
          </Select>
          {errors.status_of_book && <p className="text-red-500 text-xs mt-1">{errors.status_of_book.message}</p>}
        </div>
      
      {/* {about author} */}
      <div className="md:col-span-2">
          <label htmlFor="aboutAuthor" className="text-gray-700 text-sm font-medium">About Author</label>
          <textarea
            {...register("about_author")}
            id="aboutAuthor"
            rows={3}
            placeholder="Enter book synopsis"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EA5900] focus:border-[#EA5900]"
          ></textarea>
          {errors.about_author && <p className="text-red-500">{errors.about_author.message}</p>}
        </div> 

        {/* Synopsis Textarea */}
        <div className="md:col-span-2">
          <label htmlFor="synopsis" className="text-gray-700 text-sm font-medium">Synopsis</label>
          <textarea
            {...register("synopsis")}
            id="synopsis"
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
