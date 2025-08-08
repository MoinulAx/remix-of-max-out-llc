# Image Management Guide

## Organized Image Structure

All images are now centrally managed through `src/assets/images/index.ts`. This provides:

### Benefits:
- **Easy updates**: Change image paths in one place
- **Descriptive naming**: Clear, meaningful names instead of random UUIDs
- **Organized structure**: Images grouped by purpose/category
- **Type safety**: Intellisense support for image references

### Image Categories:

#### Backgrounds
- `images.backgrounds.orangeryMain` - Main orangery background image

#### Portraits  
- `images.portraits.portraitSession` - Professional portrait session

#### Events
- `images.events.eventCoverage` - Event photography coverage

#### Products
- `images.products.productShoot` - Product photography samples

#### Web Projects
- `images.webProjects.ecommercePlatform` - E-commerce platform showcase

#### Team Members
- `images.team.rummy` - Founder Rummy
- `images.team.designer` - Sarah Chen (Designer)
- `images.team.marketer` - Marcus Johnson (Marketing)
- `images.team.photographer` - Elena Rodriguez (Content)
- `images.team.architect` - Alex Thompson (Technical)
- `images.team.coordinator` - Maya Patel (Client Relations)

#### About Section
- `images.about.interior` - Interior design image
- `images.about.rummyAtWork` - Rummy working photo

#### Portfolio
- `images.portfolio.orangeryGallery` - Gallery showcase image

## How to Update Images:

1. **Replace existing images**: Update the path in `src/assets/images/index.ts`
2. **Add new images**: 
   - Upload to appropriate folder structure
   - Add reference to `index.ts`
   - Import `images` object in component
   - Use semantic reference (e.g., `images.category.imageName`)

## Current Physical Location:
All images are currently in `/public/lovable-uploads/` but referenced through the organized system for easy migration.