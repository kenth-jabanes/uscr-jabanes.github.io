"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/reduxUtils/store";
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaEdit, FaUserAlt } from "react-icons/fa";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import useTryouts from "@/hooks/useTryouts";
import useAppointments from "@/hooks/useAppointments";
import useInventory from "@/hooks/useInventory";
import { GrAdd } from "react-icons/gr";
import {
  deleteAppointment,
  deleteInventory,
  deleteTryout,
  insertInventory,
  updateInventory,
} from "@/app/api/api";

import { useHandleLogout } from "@/utils/authUtils";
import { MdDeleteOutline } from "react-icons/md";

// Add this interface near the top of the file
interface InventoryData {
  id: string;
  item_name: string;
  item_qty: number;
}

export default function Dashboard() {
  const handleLogout = useHandleLogout();

  const onLogoutClick = () => {
    handleLogout();
  };

  const user = useSelector((state: RootState) => state.user.user);

  //   useEffect(() => {
  //     console.log("User: ", user);
  //     if (!user) {
  //       router.push("/ident/signin");
  //     }
  //   }, [user]);

  const { tryouts } = useTryouts();
  const { appointments } = useAppointments();
  const { inventory } = useInventory();

  const [currentTabView, setCurrentTabView] = useState("tryouts");
  const [currentDataView, setCurrentDataView] = useState(tryouts);
  const [inventoryToggle, setInventoryToggle] = useState(false);
  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [inventoryData, setInventoryData] = useState<InventoryData>({
    id: "",
    item_name: "",
    item_qty: 0,
  });

  useEffect(() => {
    if (currentTabView === "tryouts") {
      setCurrentDataView(tryouts);
    } else if (currentTabView === "appointments") {
      setCurrentDataView(appointments);
    } else if (currentTabView === "inventory") {
      setCurrentDataView(inventory);
    }
  }, [currentTabView, tryouts, appointments, inventory]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleEditInventory = (inventory: any) => {
    setSelectedInventory(inventory);
    setInventoryData({
      id: inventory.id,
      item_name: inventory.item_name, // make sure this matches your API field name
      item_qty: Number(inventory.item_qty) || 0, // convert to number and provide fallback
    });
    setIsEditingInventory(true);
    setInventoryToggle(true);
  };

  const handleSubmitInventory = async () => {
    try {
      if (isEditingInventory) {
        await updateInventory({
          inventoryId: inventoryData.id,
          updatedInventory: {
            item_name: inventoryData.item_name,
            item_qty: inventoryData.item_qty,
          },
        });
      } else {
        await insertInventory({
          newInventory: {
            item_name: inventoryData.item_name,
            item_qty: inventoryData.item_qty,
          },
        });
      }
      setInventoryToggle(false);
      setIsEditingInventory(false);
      setInventoryData({ id: "", item_name: "", item_qty: 0 });
    } catch (error) {
      console.error("Error handling inventory:", error);
    }
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isDismissable={false}
        hideCloseButton={true}
        isOpen={inventoryToggle}
        onOpenChange={setInventoryToggle}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h2 className="text-lg font-semibold">
                  {isEditingInventory ? "Update" : "Add"} Inventory
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="item">Item</label>
                      <Input
                        color="primary"
                        type="text"
                        id="item"
                        name="item"
                        value={inventoryData.item_name}
                        onChange={(e) =>
                          setInventoryData({
                            ...inventoryData,
                            item_name: e.target.value,
                          })
                        }
                        placeholder="Item"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="quantity">Quantity</label>
                      <Input
                        color="primary"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={String(inventoryData.item_qty || 0)} // Convert to string with fallback
                        onChange={(e) =>
                          setInventoryData({
                            ...inventoryData,
                            item_qty: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="Quantity"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  isDisabled={
                    !inventoryData.item_name || inventoryData.item_qty <= 0
                  }
                  onPress={handleSubmitInventory}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="min-h-[100svh] w-full overflow-x-hidden">
        {/* Navbar */}
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Image
                  src="/ucsr-logo.png"
                  alt="UCSR Logo"
                  width={85}
                  height={85}
                />
              </div>
              <div className="hidden md:block select-none">
                <div className="ml-10 flex items-baseline space-x-8">
                  <div>
                    {user && (
                      <Button
                        variant="ghost"
                        className="flex gap-4"
                        onPress={onLogoutClick}
                      >
                        <span className="text-[#5E9CD7]">
                          <FaUserAlt size={20} />
                        </span>
                        <h2 className="uppercase">
                          {user.user_metadata.first_name}{" "}
                          {user.user_metadata.last_name}
                        </h2>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Services Section */}
        <section
          id="services"
          className="relative min-h-[100svh] py-16 px-4 flex items-center justify-center"
        >
          <div className="absolute inset-0 w-full">
            <Image
              src="/csu-admin-orig.png"
              alt="Background"
              fill
              className="object-cover w-full opacity-70"
              priority
            />
          </div>
          <div className="h-full w-[50rem] mx-auto">
            <div className="flex justify-center">
              <Tabs
                aria-label="Options"
                color="primary"
                selectedKey={currentTabView}
                onSelectionChange={(key) => setCurrentTabView(key.toString())}
                size="lg"
              >
                <Tab
                  key="tryouts"
                  title={
                    <div className="flex items-center space-x-2 text-white">
                      <span>Tryouts</span>
                    </div>
                  }
                />
                <Tab
                  key="appointments"
                  title={
                    <div className="flex items-center space-x-2 text-white">
                      <span>Appointments</span>
                    </div>
                  }
                />
                <Tab
                  key="inventory"
                  title={
                    <div className="flex items-center space-x-2 text-white">
                      <span>Inventory</span>
                    </div>
                  }
                />
              </Tabs>
            </div>

            <div className="flex flex-col gap-8 md:gap-16 mt-6">
              <Card fullWidth>
                <CardHeader className="bg-[#5E9CD7] text-white font-semibold text-lg flex justify-between">
                  <h2 className="capitalize">{currentTabView}</h2>

                  <div className="w-full flex justify-end">
                    <Button
                      color="primary"
                      startContent={<GrAdd />}
                      className={`${
                        currentTabView === "inventory" ? "" : "invisible"
                      }`}
                      onPress={() => {
                        setIsEditingInventory(false);
                        setInventoryData({
                          id: "",
                          item_name: "",
                          item_qty: 0,
                        });
                        setInventoryToggle(true);
                      }}
                    >
                      New
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="h-[30rem]">
                  {currentDataView && currentDataView.length > 0 ? (
                    currentDataView.map((data) => (
                      <div
                        key={data.id}
                        className="flex flex-col gap-1 border border-[#5E9CD7] hover:border-blue-600 p-4 rounded-md mb-2"
                      >
                        {(currentTabView === "tryouts" ||
                          currentTabView === "appointments") && (
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-4">
                              <div className="text-[#5E9CD7] hover:text-blue-600">
                                <FaUserAlt size={20} />
                              </div>
                              <div className="text-xs flex flex-col">
                                <h2>
                                  {data.full_name} ({data.school_id_number})
                                </h2>

                                {currentTabView === "tryouts" && (
                                  <h5>
                                    {data.course} | {data?.["degreeProgram"]}
                                  </h5>
                                )}

                                <h5>{formatDate(data.created_at)}</h5>
                              </div>
                            </div>

                            <Button
                              color="danger"
                              isIconOnly
                              startContent={<MdDeleteOutline />}
                              onPress={() => {
                                if (currentTabView === "tryouts") {
                                  deleteTryout({
                                    tryoutId: parseInt(data.id),
                                  });
                                } else if (currentTabView === "appointments") {
                                  deleteAppointment({
                                    appointmentId: data.id,
                                  });
                                }
                              }}
                              size="sm"
                            ></Button>
                          </div>
                        )}

                        {currentTabView === "tryouts" && (
                          <>
                            <div className="flex gap-2">
                              <h5 className="font-semibold">
                                Event / Sports:{" "}
                              </h5>
                              <h5 className="text-justify">{data.event}</h5>
                            </div>

                            <div className="flex flex-col">
                              <h5 className="text-justify">
                                <span className="font-semibold">Remarks: </span>
                                {data.remarks}
                              </h5>
                            </div>
                            <div className="flex flex-col">
                              <h5 className="text-justify">
                                <span className="font-semibold">
                                  Recommendation:{" "}
                                </span>
                                {data.recommendation}
                              </h5>
                            </div>
                          </>
                        )}

                        {currentTabView === "appointments" && (
                          <>
                            <div className="flex gap-2">
                              <h5 className="text-justify">
                                <span className="font-semibold">Reason: </span>
                                {data.reason}
                              </h5>
                            </div>

                            {data.message && (
                              <div className="flex flex-col">
                                <h5 className="text-justify">
                                  <span className="font-semibold">
                                    Message:{" "}
                                  </span>
                                  {data.message}
                                </h5>
                              </div>
                            )}
                          </>
                        )}

                        {currentTabView === "inventory" && (
                          <>
                            <div className="flex gap-2 justify-between items-center">
                              <div className="flex flex-col">
                                <h5>
                                  <span className="font-semibold">Item: </span>
                                  {data.item_name}
                                </h5>

                                <h5>
                                  <span className="font-semibold">
                                    Quantity:{" "}
                                  </span>
                                  {data.item_qty}
                                </h5>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  color="primary"
                                  startContent={<FaEdit />}
                                  onPress={() => handleEditInventory(data)}
                                  size="sm"
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="danger"
                                  startContent={<MdDeleteOutline />}
                                  onPress={() =>
                                    deleteInventory({
                                      inventoryId: parseInt(data.id),
                                    })
                                  }
                                  size="sm"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                      <div className="w-full flex justify-end">
                        <Button
                          color="primary"
                          startContent={<GrAdd />}
                          onPress={() => setInventoryToggle(true)}
                        >
                          New
                        </Button>
                      </div>
                      <p className="text-center">
                        No {currentTabView} available at the moment
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
