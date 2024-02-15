import React from 'react';
import useGoogleSheets from 'use-google-sheets';

function calcularMedia(p1, p2, p3) {
  const nota1 = parseFloat(p1);
  const nota2 = parseFloat(p2);
  const nota3 = parseFloat(p3);

  const media = (nota1 + nota2 + nota3) / 3;

  return media.toFixed(2);
}

function situacaoAluno(media, faltas) {
  if (faltas > 0.25 * 60) {
    return "Reprovado por Faltas";
  } else if (media >= 70) {
    return "Aprovado";
  } else if (media >= 50 && media < 70) {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data[0] || !data[0].data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Aluno</th>
            <th>Faltas</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Média</th>
            <th>Situação</th>
            <th>Nota para aprovação final</th>
          </tr>
        </thead>
        <tbody>
        {data[0].data.map(aluno => {
          const media = parseFloat(calcularMedia(aluno.P1, aluno.P2, aluno.P3));
          const situacao = situacaoAluno(media, parseInt(aluno.Faltas));
          let notaAprovacaoFinal = 100 - media;
          const notaFinal = situacao === "Exame Final" ? () => notaAprovacaoFinal : () => 0;

          return (
            <tr key={aluno.Matricula}>
              <td>{aluno.Matricula}</td>
              <td>{aluno.Aluno}</td>
              <td>{aluno.Faltas}</td>
              <td>{aluno.P1}</td>
              <td>{aluno.P2}</td>
              <td>{aluno.P3}</td>
              <td>{media}</td>
              <td>{situacao}</td>
              <td>{notaFinal()}</td>
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
