import { Checkbox, Form, Modal } from "antd";
import React, { useEffect, useRef } from "react";
import { getDefaultLocale } from "react-datepicker";

const categories = [
  {
    name: "Vegetarian",
    value: "vegetarian",
  },
  { name: "Vegan", 
    value: "vegan" },
  {
    name: "Non-Vegetarian",
    value: "non-vegetarian",
  },
  {
    name: "Non-Vegetarian (Halal)",
    value: "non-vegetarian-halal",
  },
  {
    name: "May contain eggs",
    value: "may-contain-eggs",
  },
];

const Shelfs = [
  { name: "0-24 hours", value: "0-24" },
  {
    name: "24-72 hours",
    value: "24-72",
  },
  {
    name: "72-120 hours",
    value: "48-120",
  },
  {
    name: "120 - 240 hours",
    value: "120-240",
  },
  {
    name: "240+ hours",
    value: "240",
  },
];

function Filters({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  getData,
}) {
  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <Modal
      open={showFilters}
      footer={null}
      onCancel={() => setShowFilters(false)}
      width={500}
    >
      <Form>
        <div className=" p-4 flex-col bg-white z-777777">
          <div className="flex justify-between">
            <h1 className="text-orange-900 text-xl">Filters</h1>
            {/* <i
            className="ri-close-line cursor-pointer text-xl"
            onClick={() => setShowFilters(false)}
          ></i> */}
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <h1 className="text-gray-500 mb-1">Categories</h1>
            <div className="flex flex-col gap-3 justify-center">
              {categories.map((category) => {
                return (
                  <Checkbox
                    name="category"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          category: [...filters.category, category.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          category: filters.category.filter(
                            (item) => item !== category.value
                          ),
                        });
                      }
                    }}
                  >
                    {category.name}
                  </Checkbox>
                );
              })}
            </div>
          </div>
          <h1 className="text-gray-500 mt-3 mb-2">Shelf Life</h1>
          <div className="flex flex-col gap-3 justify-center">
            {Shelfs.map((Shelf) => {
              return (
                <Checkbox
                  name="Shelf"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        Shelf: [...filters.Shelf, Shelf.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        Shelf: filters.Shelf.filter((item) => item !== Shelf.value),
                      });
                    }
                  }}
                >
                  {Shelf.name}
                </Checkbox>
              );
            })}
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default Filters;
