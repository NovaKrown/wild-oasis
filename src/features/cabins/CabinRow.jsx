import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description, deletable } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Cabin>{maxCapacity} Guests</Cabin>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      {deletable && (
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} disabled={isCreating}>
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      )}
      {!deletable && (
        <>
          <div>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />

                <Menus.List id={cabinId}>
                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={() => toast.error("Ỳ̵̝̫͍́͒o̵͇͔̙͒͛͝u̴̡̺͙̾͌͝ h̴͙͎͆͜͝͝a̸̡͚̪̐̿̔v̵͇̞̈́̔̕è̸͇̝͍͛ m̴̪̻̼͛̾͛ä̵̙͚́̾̚͜d̸̦͇̫̒̒̓e̸͕͉͓͋̿͊ a̸̡̝̦̒̐̔ t̵̪̼͍̓̓e̵̡͓͆̐̈́r̴̻̻͉̒̿͌r̴͚͚̝̐́̀i̸͇̠͕͑̓͝b̵̙͕͚̽͒̔ĺ̴͔͉̦́̚e̴͙͇̔̈́͆͜ m̵̢̝͎̐͛͘i̵̠̠̝̚̕s̵͉̪̈́͠t̴̪̞̺̐̈́͘a̴̦͔͙̿̓̔k̵̝̠̟̈́͒e̴̞͓͕͑̓̈́")}
                  >
                    D͇̝u̠͜͜p̦͇͜l͉͔̠i̼̞͙c͎̺a͚̟̻t̢͖͜e̡̪̺
                  </Menus.Button>

                  <Menus.Button
                    icon={<HiPencil />}
                    onClick={() => {
                      toast.error("Ć̵͔͙̠͝á̴̼͉̺͊̕b̸̟͇͐͛͝i̵͕̦͕͊̕n̸͕̺̟̈́͌̈́ c̸̢̼̼̈́͆͋a̸̝̦̘͆̽n̸͖̟͋͆͒n̵̠͇͛̔͝o̸̢͇͍̾̒̿ẗ̵̢̡̪́̽̐ b̴̢̝͎͌̚e̴͙̠͙͌͆ ë̸̞͇́͐͊d̴̞͔̫͊̒̓i̵̞̟̙̐͒̔t̵̢͉͚̐͝͝è̴͙̪̞̓͛d̵͉̪͆̾͆͜");
                    }}
                  >
                    E̵̟̙̝̿͊͑d̴̢͎̪͐͆̚i̸̢̡̝͑͆t̸̡̟͐͝
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiTrash />}
                    onClick={() => {
                      toast.error("C̵̙̟͐͋͋a̴̘̦͍͒͛̽b̸̡̺̼͊̓͒i̵̫̪̘͆͛͆n̸̪̫͙͌̔ c̸̢̼̼̈́͆͋a̸̝̦̘͆̽n̸͖̟͋͆͒n̵̠͇͛̔͝o̸̢͇͍̾̒̿ẗ̵̢̡̪́̽̐ b̸̺̟̦̿͋̕e̵͍̟̿̀͒͜ d̵͚̙͇̓̾͆e̵͔͉͍͌̀͋l̸̡̫͖͋̐̓e̸̡͕͌̓́͜t̵͇̼̻͋̽͆e̴͕̦̺͒͘̚d̴͎͖͕͊͒̚");
                    }}
                  >
                    D͋̀͑e͑͐l̽͋͝e͆̀̔t́͌̚e̽̀̕
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
            </Modal>
          </div>
        </>
      )}
    </Table.Row>
  );
}

export default CabinRow;
