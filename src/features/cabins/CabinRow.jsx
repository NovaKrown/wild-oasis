import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, deletable } = cabin;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin Deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Cabin>{maxCapacity} Guests</Cabin>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      {deletable && (
        <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
          Delete
        </button>
      )}
      {!deletable && <button onClick={() => toast.error("C̵̙̟͐͋͋a̴̘̦͍͒͛̽b̸̡̺̼͊̓͒i̵̫̪̘͆͛͆n̸̪̫͙͌̔ c̴̠͕͔̓͊̓o̸͚͉͕̒̓͘ú̵̘̪̽͒l̵̝͎̈́̐͛͜d̵͉͕͙̀̾ n̸̟̻͑́͑ö̴̺̠̝́͘t̵͖͍͓̐̐͝ b̸̺̟̦̿͋̕e̵͍̟̿̀͒͜ d̵͚̙͇̓̾͆e̵͔͉͍͌̀͋l̸̡̫͖͋̐̓e̸̡͕͌̓́͜t̵͇̼̻͋̽͆e̴͕̦̺͒͘̚d̴͎͖͕͊͒̚")}>D̵͔̼͕͛̈́̓é̵̢̻̟̓͠l̸̪͔̝̀͒͑e̸̺͓̐̈́͊͜t̴͓͉͍͋͐͋e̵̢̠̼̿̽͘</button>}
    </TableRow>
  );
}

export default CabinRow;
