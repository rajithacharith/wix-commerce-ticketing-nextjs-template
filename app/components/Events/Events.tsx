'use client';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { getDatePart } from '@app/utils/date-formatter';
import { wixEvents } from '@wix/events';
import { useState } from 'react';
import testIds from '@app/utils/test-ids';
import { TicketDefinitionExtended } from '@app/types/ticket';

export const Events = ({ events }: { events: TicketDefinitionExtended[] }) => {
  const [expendEventDescription, setExpendEventDescription] = useState(
    {} as Record<string, boolean>
  );

  return (
    <div
      className="px-8 sm:px-0 max-w-4xl mx-auto"
      data-testid={testIds.TICKET_LIST.CONTAINER}
    >
      <h1 className="uppercase text-4xl sm:text-7xl text-center sm:text-left">
        Tickets
      </h1>
      <div className="py-10">
        {events!.map((event) => (

           <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </a>
        ))}
      </div>
    </div>
  );
};
