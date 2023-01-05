import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      {/* Background */}
      <div className="bg-banner bg-cover bg-center">
        {/* layer */}

        <div className="bg-gradient-to-r from-slate-50/20 to-slate-600/50">
          {/* Container */}

          <div className="max-w-screen-xl mx-auto px-4">
            {/* Layout */}

            <div className="flex items-center justify-center lg:justify-start h-banner">
              {/* Contain Box */}

              <div className="text-stone-200 text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl mb-4 font-bold">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Velit, sapiente.
                  </h1>

                  <p className="text-sm sm:text-lg ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos!
                  </p>
                </div>

                <Link className="btn bg-inherit border-none text-red-400 sm:text-white sm:btn-error" to="/products">
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
