import { Link } from "react-router-dom";

const OrderCard = ({
  openModal,
  id,
  orderNumber,
  orderTime,
  plate,
  brand,
  serviceDetails,
  isFinished,
  isCanceled,
}) => {
  return (
    <div className="rounded-lg text-sm font-medium leading-5 p-5 bg-white shadow-md hover:shadow-lg mb-4 space-y-1 w-full md:w-auto cursor-pointer">
      {!isFinished && !isCanceled && (
        <div className="flex justify-end">
          <button
            onClick={openModal}
            className="p-4 rounded-md hover:ring-2 transition ease"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-dark">Sıra No:</h4>
        <h3 className="text-body-color">{orderNumber}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-dark">Araç Kabul Saati:</h4>
        <h3 className="text-body-color">{orderTime}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-dark">Plaka:</h4>
        <h3 className="text-body-color">{plate}</h3>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-dark">Marka:</h4>
        <h3 className="text-body-color">{brand}</h3>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-semibold text-dark">Hizmetler:</h4>
        {serviceDetails.map((serviceDetail) => (
          <h3
            key={`serviceDetails id:${serviceDetail.id}`}
            className="text-body-color"
          >
            {serviceDetail.title}
          </h3>
        ))}
      </div>
      {!isFinished && !isCanceled && (
        <div className="flex justify-end">
          <Link to={`/serviceStatus/${id}`}>
            <button className="px-4 py-2 font-bold text-white bg-blue-700 rounded-md hover:bg-blue-900 transition ease">
              Hizmet Durumu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
