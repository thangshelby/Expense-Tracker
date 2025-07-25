import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profile: UserProfile = {
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pjmojo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    socialLinks: [
      { type: 'facebook', url: '#' },
      { type: 'twitter', url: '#' },
      { type: 'linkedin', url: '#' },
      { type: 'instagram', url: '#' },
    ],
    address: {
      country: 'United States.',
      city: 'Phoenix, Arizona, United States.',
      postalCode: 'ERT 2489',
      taxId: 'AS456384',
    },
  };
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
  socialLinks: { type: string; url: string }[];
  address: {
    country: string;
    city: string;
    postalCode: string;
    taxId: string;
  };
}
