import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecObj) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecObj));
    },
    onError: () => {
      notificationDispatch({
        type: "show",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "hide" });
      }, 5000);
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
    notificationDispatch({
      type: "show",
      payload: `you added anecdote a new anecdote: '${anecContent}'`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "hide" });
    }, 5000);
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
