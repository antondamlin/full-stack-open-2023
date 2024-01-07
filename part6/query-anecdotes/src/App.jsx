import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, voteAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();
  const request = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  console.log(JSON.parse(JSON.stringify(request)));

  const anecdotes = request.data;

  const updateAnecMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecObj) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anec) =>
          anec.id === newAnecObj.id ? newAnecObj : anec
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (request.isLoading) {
    return <div>loading data...</div>;
  }

  if (request.isError) {
    return <div>anecdote service not avaiable due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
