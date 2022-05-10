import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import OrderCard from "../../components/orderCard";
import { useDispatch, useSelector } from "react-redux";
import serviceSlice, {
  getServicesAsync,
  selectAllServices,
  selectServiceById,
} from "../../redux/services/serviceSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ openModal }) {
  const dispatch = useDispatch();
  const services = useSelector(selectAllServices);
  const servicesStatus = useSelector((state) => state.services.status);

  const workInProgress = services.filter((service) => !service.isFinished && service.isContinue);
  const completedWorks = services.filter((service) => service.isFinished);
  const canceledWorks = services.filter((service) => service.isCanceled);
  console.log(services);
  useEffect(() => {
    if (servicesStatus === "idle" && services) {
      dispatch(getServicesAsync());
    }
  }, [servicesStatus, dispatch, services]);

  if (servicesStatus === "loading") {
    return <div>LOADİNG...</div>;
  }

  return (
    <div className="w-full max-w-md p-4 sm:px-0 mx-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-sm bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Devam Eden
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Tamamlanan
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            İptal
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-sm bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 max-h-[600px] lg:max-h-[700px] overflow-y-auto scroolme"
            )}
          >
            {workInProgress.map((service) => (
              <OrderCard
                key={service.id}
                id={service.id}
                serviceDetails={service.serviceDetails}
                openModal={openModal}
                orderNumber={service.orderNumber}
                orderTime={service.orderTime}
                plate={service.plate}
                brand={service.brand}
                isFinished={service.isFinished}
                isContinue={service.isContinue}
                isCanceled={service.isCanceled}
              />
            ))}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-sm bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 max-h-[600px] lg:max-h-[700px] overflow-y-auto scroolme"
            )}
          >
            {completedWorks.map((service) => (
              <OrderCard
                key={service.id}
                serviceDetails={service.serviceDetails}
                openModal={openModal}
                orderNumber={service.orderNumber}
                orderTime={service.orderTime}
                plate={service.plate}
                brand={service.brand}
                isFinished={service.isFinished}
                isContinue={service.isContinue}
                isCanceled={service.isCanceled}
              />
            ))}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-sm bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 max-h-[600px] lg:max-h-[700px] overflow-y-auto scroolme"
            )}
          >
            {canceledWorks.map((service) => (
              <OrderCard
                key={service.id}
                serviceDetails={service.serviceDetails}
                openModal={openModal}
                orderNumber={service.orderNumber}
                orderTime={service.orderTime}
                plate={service.plate}
                brand={service.brand}
                isFinished={service.isFinished}
                isContinue={service.isContinue}
                isCanceled={service.isCanceled}
              />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
