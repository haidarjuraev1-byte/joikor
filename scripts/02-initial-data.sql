-- Insert initial data for Joikor platform

-- Insert job categories with proper multilingual support
INSERT INTO job_categories (name_ru, name_tj, name_en, slug, icon, color, sort_order) VALUES
('IT и разработка', 'IT ва таҳия', 'IT & Development', 'it-development', 'Code', '#3B82F6', 1),
('Дизайн', 'Дизайн', 'Design', 'design', 'Palette', '#8B5CF6', 2),
('Маркетинг', 'Маркетинг', 'Marketing', 'marketing', 'TrendingUp', '#10B981', 3),
('Продажи', 'Фурӯш', 'Sales', 'sales', 'ShoppingCart', '#F59E0B', 4),
('Финансы', 'Молия', 'Finance', 'finance', 'DollarSign', '#EF4444', 5),
('Образование', 'Маориф', 'Education', 'education', 'GraduationCap', '#6366F1', 6),
('Медицина', 'Тиб', 'Healthcare', 'healthcare', 'Heart', '#EC4899', 7),
('Управление', 'Идора', 'Management', 'management', 'Users', '#84CC16', 8),
('Строительство', 'Сохтмон', 'Construction', 'construction', 'Building', '#F97316', 9),
('Транспорт', 'Нақлиёт', 'Transportation', 'transportation', 'Truck', '#06B6D4', 10),
('Ресторанный бизнес', 'Тиҷорати ресторан', 'Restaurant Business', 'restaurant', 'ChefHat', '#14B8A6', 11),
('Безопасность', 'Амният', 'Security', 'security', 'Shield', '#64748B', 12);

-- Insert common skills
INSERT INTO skills (name, category, is_verified, usage_count) VALUES
-- IT Skills
('JavaScript', 'Programming', true, 150),
('Python', 'Programming', true, 120),
('React', 'Frontend', true, 100),
('Node.js', 'Backend', true, 80),
('TypeScript', 'Programming', true, 90),
('Vue.js', 'Frontend', true, 60),
('Angular', 'Frontend', true, 70),
('PHP', 'Backend', true, 85),
('Java', 'Programming', true, 95),
('C#', 'Programming', true, 75),
('SQL', 'Database', true, 110),
('PostgreSQL', 'Database', true, 65),
('MongoDB', 'Database', true, 55),
('Docker', 'DevOps', true, 45),
('AWS', 'Cloud', true, 40),
('Git', 'Tools', true, 130),

-- Design Skills
('Figma', 'Design', true, 80),
('Adobe Photoshop', 'Design', true, 90),
('Adobe Illustrator', 'Design', true, 70),
('Sketch', 'Design', true, 50),
('Adobe XD', 'Design', true, 60),
('UI/UX Design', 'Design', true, 85),
('Graphic Design', 'Design', true, 75),

-- Marketing Skills
('Digital Marketing', 'Marketing', true, 65),
('SEO', 'Marketing', true, 70),
('Google Ads', 'Marketing', true, 55),
('Facebook Ads', 'Marketing', true, 50),
('Content Marketing', 'Marketing', true, 60),
('Email Marketing', 'Marketing', true, 45),
('Social Media Marketing', 'Marketing', true, 80),

-- General Skills
('Project Management', 'Management', true, 90),
('Agile', 'Management', true, 75),
('Scrum', 'Management', true, 70),
('Leadership', 'Management', true, 85),
('Communication', 'Soft Skills', true, 120),
('Problem Solving', 'Soft Skills', true, 100),
('Teamwork', 'Soft Skills', true, 110),
('Time Management', 'Soft Skills', true, 95);

-- Insert subscription plans
INSERT INTO subscription_plans (name, description, price, billing_period, features, limits) VALUES
('Бесплатный', 'Базовые возможности для поиска работы', 0.00, 'monthly', 
 '{"job_applications": true, "basic_search": true, "profile_creation": true, "email_support": true}',
 '{"resumes": 1, "applications_per_day": 5, "job_alerts": 0, "priority_support": false, "resume_analytics": false}'
),
('Бизнес', 'Расширенные возможности для активного поиска', 150.00, 'monthly',
 '{"unlimited_applications": true, "advanced_search": true, "job_alerts": true, "priority_support": true, "resume_analytics": true, "profile_boost": true}',
 '{"resumes": 5, "applications_per_day": 50, "job_alerts": 10, "priority_support": true, "resume_analytics": true}'
),
('HR+', 'Полный доступ для работодателей', 500.00, 'monthly',
 '{"job_postings": true, "candidate_search": true, "applicant_tracking": true, "company_branding": true, "analytics": true, "priority_support": true, "featured_jobs": true}',
 '{"job_postings": 20, "featured_jobs": 5, "candidate_search": true, "applicant_tracking": true, "company_branding": true, "analytics": true}'
);

-- Update job categories with job counts (will be updated by triggers)
UPDATE job_categories SET job_count = 0;
