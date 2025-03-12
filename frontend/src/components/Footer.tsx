'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-8 text-center text-gray-600 mt-8 pt-8">
      <p>&copy; {new Date().getFullYear()} 学习与创造平台. All rights reserved.</p>
    </footer>
  );
}
