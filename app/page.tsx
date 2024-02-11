import { getWixClient } from '@app/hooks//useWixClientServer';
import { wixEvents } from '@wix/events';
import { products } from '@wix/stores';
import { HomeScreen } from '@app/components/HomeScreen/HomeScreen';
import { TicketDefinitionExtended } from './types/ticket';

export default async function Home() {
  const wixClient = await getWixClient();
  let productsForCategories: { category: string; product: products.Product }[] =
    [];
  try {
    const { items: collectionsItems } = await wixClient.collections
      .queryCollections()
      .ne('_id', '00000000-000000-000000-000000000001')
      .limit(3)
      .find();
    productsForCategories = await Promise.all(
      collectionsItems.map((collection) =>
        wixClient.products
          .queryProducts()
          .eq('collectionIds', collection._id)
          .limit(1)
          .find()
          .then((products) => ({
            product: products.items[0],
            category: collection.name!,
          }))
      )
    );
  } catch (e) {}

  let events: wixEvents.Event[] = [];
  let tickets: TicketDefinitionExtended[] = [];
  try {
    events = (
      await wixClient.wixEvents.queryEventsV2({
        fieldset: [
          wixEvents.EventFieldset.FULL,
          wixEvents.EventFieldset.DETAILS,
        ],
        query: {
          paging: { limit: 10, offset: 0 },
          sort: [{ fieldName: 'start', order: wixEvents.SortOrder.ASC }],
        },
      })
    ).events!;

    tickets = (await wixClient.checkout.queryAvailableTickets({
      filter: { eventId: "dc4790d0-bfad-46d9-9f21-71600878ffbd" },
      offset: 0,
      limit: 100,
      sort: 'orderIndex:asc',
    })).definitions?.map((ticket) => ({
      ...ticket,
      canPurchase:
        ticket.limitPerCheckout! > 0 &&
        (!ticket.salePeriod ||
          (new Date(ticket.salePeriod.endDate!) > new Date() &&
            new Date(ticket.salePeriod.startDate!) < new Date())),
    })) as TicketDefinitionExtended[]
  } catch (e) {}
  return (
    <HomeScreen events={tickets} productsForCategories={productsForCategories} />
  );
}
