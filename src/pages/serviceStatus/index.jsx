import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  selectServiceById,
  toggleCompleteAsync,
} from "../../redux/services/serviceSlice";

const ServiceStatus = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const service = useSelector((state) => selectServiceById(state, id));
  // const servicesStatus = useSelector((state) => state.services.status);
  const [checked, SetChecked] = useState({
    checkbox1: true,
    checkbox2: service.isWorkingOn ? service.isWorkingOn : false,
    checkbox3: service.isFinished ? service.isFinished : false,
  });

  console.log(checked,service);
  const [values, setValues] = useState({
    cash: "",
    credit_cart: "",
  });
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChecked = (e) => {
    SetChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(
      toggleCompleteAsync({
        id: id,
        isWorkingOn: checked.checkbox2,
        isFinished: checked.checkbox3,
      })
    );
  }, [dispatch, id, checked.checkbox3, checked.checkbox2]);

  // const options = {
  //   style: "currency",
  //   currency: "try",
  // };

  // const toCurrency = (number) => {
  //   const nn = number.toLocaleString("tr-TR", options);
  //   return nn;
  // };

  // console.log(toCurrency(22456));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // if (servicesStatus === "loading") {
  //   return <div>LOADİNG...</div>;
  // }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900 text-center"
                  >
                    Ödeme Detayı
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                    {service.serviceDetails.map((details) => (
                      <h3 key={service.id} className="text-sm font-semibold">{details.title} <span>- {details.price}₺</span></h3>
                    ))}
                    <h3 className="text-md font-semibold">
                      Toplam <span>- ??₺</span>
                    </h3>
                    {/* <div className="flex items-center mb-4">
                      <input
                        id="payment-option-1"
                        type="radio"
                        name="payment"
                        value="Nakit"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        aria-labelledby="payment-option-1"
                        aria-describedby="payment-option-1"
                      />
                      <label
                        htmlFor="payment-option-1"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Nakit
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="payment-option-2"
                        type="radio"
                        name="payment"
                        value="Kart"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        aria-labelledby="payment-option-2"
                        aria-describedby="payment-option-2"
                      />
                      <label
                        htmlFor="payment-option-2"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Kredi Kartı
                      </label>
                    </div> */}
                    <div>
                      <label
                        htmlFor="cash"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nakit
                      </label>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="cash"
                        value={values.cash}
                        max="99999"
                        min="0"
                        maxLength="99999"
                        id="cash"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nakit"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="credit_cart"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kredi Kartı
                      </label>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="credit_cart"
                        value={values.credit_cart}
                        max="99999"
                        min="0"
                        maxLength="99999"
                        id="credit_cart"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kredi Kartı"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Kapat
                      </button>
                      <button
                        type="submit"
                        disabled={
                          values.cash === "" && values.credit_cart === ""
                        }
                        className="inline-flex justify-center rounded-md border border-transparent text-white bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-300"
                      >
                        Ödemeyi Tamamla
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="w-full max-w-md mx-auto  mt-10">
        <div className="mb-5">
          {/* <Link to="/">
            <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-700 rounded-md hover:bg-blue-900 transition ease">
              Geri
            </button>
          </Link> */}
          <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-700 rounded-md hover:bg-blue-900 transition ease">
              <a href="/">Geri</a>
            </button>
        </div>
        <div className="rounded-lg text-lg font-medium leading-5 p-5 bg-white shadow-md hover:shadow-lg mb-4 space-y-8">
          <div className="flex justify-between">
            <h3 className="text-body-color">{service.plate}</h3>
            <h3 className="text-body-color">{service.brand}</h3>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-dark">Araç Kabul:</h4>
            <label className="inline-flex items-center mt-3">
              <input
                onChange={handleChecked}
                name="checkbox1"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-dark">Araç İşleme Alındı:</h4>
            <label className="inline-flex items-center mt-3">
              <input
                onChange={handleChecked}
                value={checked.checkbox2}
                defaultChecked={checked.checkbox2}
                name="checkbox2"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-dark">İşlem Bitti:</h4>
            <label className="inline-flex items-center mt-3">
              <input
                onChange={handleChecked}
                value={checked.checkbox3}
                defaultChecked={checked.checkbox3}
                name="checkbox3"
                disabled={!checked.checkbox2}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </label>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={openModal}
              disabled={!checked.checkbox2 || !checked.checkbox3}
              className="px-4 py-2 font-bold text-white bg-blue-700 rounded-md hover:bg-blue-900 transition ease disabled:bg-gray-300"
            >
              Ödeme Al
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceStatus;
