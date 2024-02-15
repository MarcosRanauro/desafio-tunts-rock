import React from 'react';
import useGoogleSheets from 'use-google-sheets';

function calculateAverage(p1, p2, p3) {
  const n1 = parseFloat(p1);
  const n2 = parseFloat(p2);
  const n3 = parseFloat(p3);

  const average = (n1 + n2 + n3) / 3;

  return average.toFixed(2);
}

function studentStatus(average, absence) {
  if (absence > 0.25 * 60) {
    return "Reprovado por Faltas";
  } else if (average >= 70) {
    return "Aprovado";
  } else if (average >= 50 && average < 70) {
    return "Exame Final";
  } else {
    return "Reprovado";
  }
}

function Home() {
  const { data, error, isLoading } = useGoogleSheets({
    apiKey: "AIzaSyAOdcyfFrItMrEjTcQC6w5CxC_XKaRR0ho",
    sheetId: "1GTyo8lq6koRHrccA3KJ9ew2E-GepUfmkKqB-79V_G2U",
  });

  if (isLoading || !data || !data[0] || !data[0].data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data[0].data);

  return (
    <div class="text-center">
      <h1>Boletim Escolar</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Aluno</th>
            <th>Faltas</th>
            <th>P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>Média</th>
            <th>Situação</th>
            <th>Nota para aprovação final</th>
          </tr>
        </thead>
        <tbody>
        {data[0].data.map(student => {
          const average = parseFloat(calculateAverage(student.P1, student.P2, student.P3));
          const situation = studentStatus(average, parseInt(student.Faltas));
          let gradeFinalApproval = 100 - average;
          const finalGrade = situation === "Exame Final" ? () => gradeFinalApproval : () => 0;

          return (
            <tr key={student.Matricula}>
              <td>{student.Matricula}</td>
              <td>{student.Aluno}</td>
              <td>{student.Faltas}</td>
              <td>{student.P1}</td>
              <td>{student.P2}</td>
              <td>{student.P3}</td>
              <td>{average}</td>
              <td>{situation}</td>
              <td>{finalGrade()}</td>
            </tr>
          );
        }
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Home;
