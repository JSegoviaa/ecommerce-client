import { FC, useContext, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { AdminContext } from '../../../contexts';
import { Loading } from '../../ui';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC = () => {
  const { countUsersRole, usersType, chartLoading } = useContext(AdminContext);

  useEffect(() => {
    countUsersRole();
  }, []);

  const data = {
    labels: usersType.map(({ role }) => role),
    datasets: [
      {
        label: 'Cantidad de usuarios por rol.',
        data: usersType.map(({ count }) => count),
        backgroundColor: [
          'rgba(255, 99, 132,0.6)',
          'rgba(54, 162, 235,0.6)',
          'rgba(255, 206, 86,0.6)',
          'rgba(75, 192, 192,0.6)',
          'rgba(153, 102, 255,0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <>{chartLoading ? <Loading /> : <Pie data={data} />}</>;
};

export default PieChart;
