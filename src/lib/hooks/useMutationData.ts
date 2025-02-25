import {
    MutationFunction,
    MutationKey,
    useMutation,
    useMutationState,
    useQueryClient,
  } from '@tanstack/react-query'
  import {toast} from "@medusajs/ui"

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string | string[],
    onSuccess?: () => void
  ) => {
    const client = useQueryClient()
    const { mutate, isPending } = useMutation({
      mutationKey,
      mutationFn,
      onSuccess(data) {
        if (onSuccess) onSuccess()
  
         else{
          toast.success("Info", {
            description: "Review added successfully",
          })
         }

      },
      onSettled: async () => {
        const isString = typeof queryKey === "string"
        return await client.invalidateQueries({
          queryKey: isString ? [queryKey] : queryKey ? [...queryKey] : [],
          exact: true,
        })
      },
      onError:async ()=>{
        toast.error("Info", {
          description: "something went wrong !!",
        })
      }
    })
  
    return { mutate, isPending }
  }
  