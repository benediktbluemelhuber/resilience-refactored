const Table = ({ scoresAssessment, scoresBenchmark, titles }) => {
    return (
      <table class="table-auto w-full text-center border-2 border-blue-500 rounded-xl">
        <thead>
          <tr class="bg-blue-800 text-white">
            <th class="px-4 py-2">Nr.</th>
            <th class="px-4 py-2">Werttreiber</th>
            <th class="px-4 py-2">Ihr Wert</th>
            <th class="px-4 py-2">Benchmark</th>
            <th class="px-4 py-2">Abweichung</th>
          </tr>
        </thead>
        <tbody>
          {scoresAssessment.map((value1, index) => (
            <tr
              key={index}
              class={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
            >
              <td class="border px-4 py-2">{index + 1}</td>
              <td class="border px-4 py-2">{titles[index]}</td>
              <td class="border px-4 py-2">{value1.toFixed(1)}</td>
              <td class="border px-4 py-2">{(scoresBenchmark[index] * 10).toFixed(1)}</td>
              <td class={`border px-4 py-2 ${
                value1 - scoresBenchmark[index] * 10 > 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
              >
                {(value1 - scoresBenchmark[index] * 10).toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  
  
  
  