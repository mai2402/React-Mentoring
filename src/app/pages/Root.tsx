import { Outlet} from 'react-router-dom';
import Header from '../../shared/components/Header';


export default function Root() {

  return (
    <>
     <Header/>
      <Outlet />
    </>
  );
}
