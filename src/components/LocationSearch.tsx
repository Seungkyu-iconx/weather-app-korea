import React, { useState } from 'react';
import { searchLocation } from '@/lib/weather-api';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface LocationSearchProps {
  onSelectLocation: (query: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<Array<{
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchLocation(query);
      setLocations(results);
      
      if (results.length === 0) {
        setError('검색 결과가 없습니다. 다른 지역명을 입력해보세요.');
      }
    } catch (error) {
      console.error('위치 검색 중 오류 발생:', error);
      setError('위치 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="도시나 지역 이름을 입력하세요"
            className="w-full px-10 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          />
          {query && (
            <button 
              type="button" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setQuery('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : '검색'}
        </Button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {locations.length > 0 && (
        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {locations.map((location) => (
            <div
              key={`${location.name}-${location.lat}-${location.lon}`}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => onSelectLocation(`${location.lat},${location.lon}`)}
            >
              <div className="flex items-center">
                <div className="mr-3 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {location.region && `${location.region}, `}{location.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}; 