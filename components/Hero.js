import { Fade } from 'react-awesome-reveal';

const Hero = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col lg:items-center py-20 dark:bg-gray-800">
      <Fade cascade triggerOnce>
        <h1 className="text-6xl text-gray-900 lg:text-center font-bold max-w-lg dark:text-gray-100">
          GraphCMS Portfolio{' '}
          <Fade triggerOnce>
            <span className="text-blue-900 dark:text-blue-500">Website</span>
          </Fade>
        </h1>
        <p className="text-gray-700 font-semibold text-xl mt-8 lg:text-center dark:text-gray-100">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </Fade>
    </div>
  );
};

export default Hero;
