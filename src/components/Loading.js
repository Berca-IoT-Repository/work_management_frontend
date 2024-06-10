import React, { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    const data = window.location.href;
    // window.open(data);
    console.log(data);
  }, []);

  return (
    <div>
      {/* Preloader */}
      <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
    </div>
  );
};

export default Loading;
