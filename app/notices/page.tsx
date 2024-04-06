import React from "react";

const NoticesPage = () => {
  return (
    <div className="flex justify-center items-center flex-col max-w-3xl w-full mx-auto p-5">
      <h1 className="text-3xl mb-10">Notices</h1>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="text-left border broder-border p-2 rounded-lg">
          <h1 className="text-xl font-bold">Notice 1</h1>
          <h1 className="text-sm my-2 text-muted-foreground">
            {new Date().toLocaleString()}
          </h1>
          <h1 className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
            architecto ratione et veritatis dolore deleniti autem possimus
            tempore, dolor inventore nemo mollitia vitae error iure dolorum ad
            delectus quos nostrum laborum eveniet aliquid. Natus omnis esse
            accusantium id, inventore nulla cupiditate porro magnam ad provident
            explicabo quia neque assumenda blanditiis dicta beatae adipisci
            fugiat repellendus libero asperiores sapiente repellat alias non.
          </h1>
        </div>
        <div className="text-left border broder-border p-2 rounded-lg">
          <h1 className="text-xl font-bold">Notice 2</h1>
          <h1 className="text-sm my-2 text-muted-foreground">
            {new Date().toLocaleString()}
          </h1>
          <h1 className="">
            Nostrum laborum eveniet aliquid. Natus omnis esse accusantium id,
            inventore nulla cupiditate porro magnam ad provident explicabo quia
            neque assumenda blanditiis dicta beatae adipisci fugiat repellendus
            libero asperiores sapiente repellat alias non.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
