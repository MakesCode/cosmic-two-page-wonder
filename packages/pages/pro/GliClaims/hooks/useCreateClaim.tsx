import { createClaimMutationOption } from "@features/pro/gli/Claims/createClaim/createClaimMutationOption";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useCreateClaim = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...createClaimMutationOption(dispatch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });

  return {
    createClaim: mutation.mutate,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
