import http from "./http-common";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useQuery } from '@tanstack/react-query'



const Armies = () => {
  const { getToken } = useAuth();
  const { isPending, error, data, isFetched } = useQuery({ 
    queryKey: ['testData'],
    queryFn: async () => {
      const token = await getToken();
      console.log('token', token);
      const response = await http.get('army-service/armies', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    }
  })

  /*
const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://api.github.com/repos/tannerlinsley/react-query')
        .then((res) => res.data),
  })
  */

  return (
    <div>
      {isPending && (<p>Pedning...</p>)}
      {error && (<p>Oops! There was a problem!</p>)}
      {data && (<p>{JSON.stringify(data)}</p>)}
    </div>
  );
};

const App = () => {
  const { isSignedIn } = useAuth();
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <body>
        {!isSignedIn && <p>You need to login to see anything!</p>}
        {isSignedIn && (<Armies />)}
      </body>
    </div>
  )
};



// const getArmies = async () => {
//   return axios.get('http://localhost:5116/army-service/armies', {

//   })
// }

export default App;