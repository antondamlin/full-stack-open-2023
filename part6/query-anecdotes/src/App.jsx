import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "./requests";

const App = () => {
  const request = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(request)));

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  if (request.isLoading) {
    return <div>loading data...</div>;
  }

  if (request.isError) {
    return <div>anecdote service not avaiable due to problems in server</div>;
  }

  const anecdotes = request.data;

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