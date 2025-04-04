import React, { useState } from 'react';
import { searchLocation } from '@/lib/weather-api';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface LocationSearchProps {
  onSelectLocation: (lat: number, lon: number, name: string, country: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Array<{
    name: string;
    country: string;
    lat: number;
    lon: number;
  }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchLocation(query);
      setLocations(results);
    } catch (error) {
      console.error('위치 검색 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도시 또는 지역 이름을 입력하세요"
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <Button type="submit" disabled={loading}>
          {loading ? '검색 중...' : '검색'}
        </Button>
      </form>
      
      {locations.length > 0 && (
        <div className="mt-4 space-y-2">
          {locations.map((location) => (
            <div
              key={`${location.name}-${location.lat}-${location.lon}`}
              className="p-2 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => onSelectLocation(
                location.lat,
                location.lon,
                location.name,
                location.country
              )}
            >
              <p>{location.name}, {location.country}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}; 