import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const getId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const anecContent = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    const anecObject = {
      content: anecContent,
      votes: 0,
      id: getId(),
    };
    newAnecMutation.mutate(anecObject);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
