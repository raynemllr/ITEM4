import React from "react";
import useSWR from "swr";

const apiEndpoint = new URL("https://jsonplaceholder.typicode.com/comments");

const fetcher = async () => {
  const result = await fetch(apiEndpoint);
  const data = await result.json();
  const limitData = data.slice(0, 6);

  if (!result.ok) {
    const error = new Error("An error occurred while fetching the data.");

    throw error;
  }

  return limitData;
};

fetcher();

const App = () => {
  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher);

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <div>Loading...</div>;

  const headers = Object.keys(data[0]).slice(2, 5);
  const values = data.map((item) => Object.values(item).slice(2, 5));

  console.log(values);
  return (
    <>
      <h1 className="text-center text-xl font-bold my-12">Comments Record</h1>
      <table className="table-auto p-5 w-9/12 m-auto">
        <thead className="bg-black text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-slate-300 ">
              {value.map((comment, index) => (
                <td key={index} className="p-4">
                  {comment}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
