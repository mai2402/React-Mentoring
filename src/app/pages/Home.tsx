import studentsImg from "../../assets/students.jpg"
import listImg from '../../assets/list.jpg';
import certificateImg from '../../assets/certificate.jpg';
// import Uploader from '../components/shared/Uploader';






export default function HomePage() {
  

  
  return (
    <main className="home">
      <h2 className='home__heading '>Our Mission: Your Success</h2>
      <section className='home__section'>
        <img className='home__image' src={studentsImg} alt="A group of students" />
        <div className='home__section--reverse'>
          <h3 className='home__subheading'>What we do</h3>
          <p className='home__text'>
            ReactMentoring is a platform for React developers to find mentors
            who can help them with their React-related questions and problems.
            We are a community of React developers who want to help each other
            succeed.
          </p>
        </div>
      </section>

      <section className='home__section home__section--reverse'>
        <img  className="home__image" src={listImg} alt="A list of sessions" />
        <div  >
          <h3 className='home__subheading'>What we offer</h3>
          <p className='home__text'>
            We offer a variety of mentoring sessions, from one-on-one mentoring
            to group mentoring sessions. Browse our available sessions to find
            the one that best fits your needs.
          </p>
        </div>
      </section>
      <section className='home__section'>
        <img className='home__image' src={certificateImg} alt="A certificate" />
        <div className='home__section--reverse'>
          <h3 className='home__subheading'>What you get</h3>
          <p className='home__text'>
            No matter if you are a beginner or an experienced React developer,
            we are here to help you level up your React skills.
          </p>
        </div>
      </section>
    
      
    </main>
  );
}
