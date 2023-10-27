'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ExploreSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.replace(`/explore?query=${query}`);
  };
  return (
    <div className="mt-5">
      <form onSubmit={submit}>
        <input
          className="w-full rounded-2xl h-14 p-3 outline-none bg-muted"
          placeholder="Search users with there name or username .."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default ExploreSearchBar;
