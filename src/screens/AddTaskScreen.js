import { AddTaskService } from '../api/apiService';

export const AddTaskScreen = ({ navigation }) => {
  const [taskData, setTaskData] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
  });
}